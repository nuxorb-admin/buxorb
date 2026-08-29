-- =========================================================
-- 0059 — traspasos entre almacenes y ajustes por conteo físico
-- (compras-proveedores-modulo-v1.md §7.2). Ambas operaciones se resuelven
-- en una función de base de datos, no en el cliente, porque son
-- movimientos que deben quedar atómicos (un traspaso son dos filas
-- ligadas; un ajuste depende de leer la existencia actual y escribir en
-- la misma transacción para no pisarse con otro ajuste concurrente).
-- =========================================================

create or replace function public.procurement_transfer_stock(
  p_producto_id uuid,
  p_origen_id uuid,
  p_destino_id uuid,
  p_cantidad numeric,
  p_fecha date default current_date
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_company_id uuid;
  v_traspaso_id uuid := gen_random_uuid();
begin
  select company_id into v_company_id from public.procurement_products where id = p_producto_id;
  if v_company_id is null or not is_company_member(v_company_id) then
    raise exception 'forbidden';
  end if;
  if p_cantidad is null or p_cantidad <= 0 then
    raise exception 'cantidad debe ser positiva';
  end if;
  if p_origen_id = p_destino_id then
    raise exception 'origen y destino deben ser distintos';
  end if;
  if not exists (select 1 from public.procurement_warehouses where id = p_origen_id and company_id = v_company_id) then
    raise exception 'almacén de origen inválido';
  end if;
  if not exists (select 1 from public.procurement_warehouses where id = p_destino_id and company_id = v_company_id) then
    raise exception 'almacén de destino inválido';
  end if;

  insert into public.procurement_inventory_movements
    (company_id, producto_id, tipo, cantidad, almacen_id, motivo, fecha, traspaso_id)
  values (v_company_id, p_producto_id, 'salida', p_cantidad, p_origen_id, 'traspaso', p_fecha, v_traspaso_id);

  insert into public.procurement_inventory_movements
    (company_id, producto_id, tipo, cantidad, almacen_id, motivo, fecha, traspaso_id)
  values (v_company_id, p_producto_id, 'entrada', p_cantidad, p_destino_id, 'traspaso', p_fecha, v_traspaso_id);

  return v_traspaso_id;
end;
$$;

grant execute on function public.procurement_transfer_stock(uuid, uuid, uuid, numeric, date) to authenticated;

create or replace function public.procurement_adjust_stock(
  p_producto_id uuid,
  p_almacen_id uuid,
  p_existencia_real numeric,
  p_fecha date default current_date
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_company_id uuid;
  v_existencia_actual numeric;
  v_diff numeric;
  v_mov_id uuid;
begin
  select company_id into v_company_id from public.procurement_products where id = p_producto_id;
  if v_company_id is null or not is_company_member(v_company_id) then
    raise exception 'forbidden';
  end if;
  if p_existencia_real is null or p_existencia_real < 0 then
    raise exception 'existencia real inválida';
  end if;
  if not exists (select 1 from public.procurement_warehouses where id = p_almacen_id and company_id = v_company_id) then
    raise exception 'almacén inválido';
  end if;

  select coalesce(sum(case when tipo = 'entrada' then cantidad else -cantidad end), 0)
    into v_existencia_actual
  from public.procurement_inventory_movements
  where producto_id = p_producto_id and almacen_id = p_almacen_id;

  v_diff := p_existencia_real - v_existencia_actual;
  if v_diff = 0 then
    return null;
  end if;

  insert into public.procurement_inventory_movements
    (company_id, producto_id, tipo, cantidad, almacen_id, motivo, fecha)
  values (
    v_company_id, p_producto_id,
    case when v_diff > 0 then 'entrada' else 'salida' end,
    abs(v_diff), p_almacen_id, 'ajuste', p_fecha
  )
  returning id into v_mov_id;

  return v_mov_id;
end;
$$;

grant execute on function public.procurement_adjust_stock(uuid, uuid, numeric, date) to authenticated;

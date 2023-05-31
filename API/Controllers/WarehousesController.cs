using Application.Brands.Commands;
using Application.Brands.Queries;
using Application.Warehouses.Commands;
using Application.Warehouses.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WarehousesController: ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Warehouse>>> Get()
        {
            return await Mediator.Send(new GetWarehouseQuery());
        }


        [HttpPost]
        public async Task<ActionResult<Warehouse>> Create([FromBody] CreateWarehouseCommand command)
        {
          
            return await Mediator.Send(command);
        }


        [HttpPost("Update")]
        public async Task<ActionResult<Warehouse>> Update([FromBody] UpdateWarehouseCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

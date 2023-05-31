using Application.Brands.Commands;
using Application.Brands.Queries;
using Application.Common.Models;
using Application.Orders.Queries;
using Application.SupplyOrders.Commands;
using Application.SupplyOrders.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SupplyOrdersController: ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<PaginatedList<SupplyOrderDto>>> GetSupplyOrderWithPagination([FromQuery] GetSupplyOrderWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpPost]
        public async Task<ActionResult<SupplyOrder>> Create([FromForm] CreateSupplyOrderCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<SupplyOrder>> Update([FromForm] UpdateSupplyOrdersCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

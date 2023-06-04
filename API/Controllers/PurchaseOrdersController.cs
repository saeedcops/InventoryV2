
using Application.PurchaseOrders.Commands;
using Application.PurchaseOrders.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PurchaseOrdersController: ApiControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<List<PurchaseOrder>>> GetItems([FromQuery] GetPurchaseOrdersQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrder>> Get(int id)
        {
            return await Mediator.Send(new GetPurchaseOrderQuery { Id = id });
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreatePurchaseOrderCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<int>> Update([FromBody] UpdatePurchaseOrderCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

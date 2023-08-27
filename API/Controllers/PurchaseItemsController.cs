using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
using Application.PurchaseItems.Commands;
using Application.PurchaseItems.Queries;
using Application.Warehouses.Commands;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class PurchaseItemsController : ApiControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<List<PurchaseItemsDto>>> GetItems([FromQuery] GetPurchaseItemsQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseItem>> Get(string id)
        {
            return await Mediator.Send(new GetPurchaseItemQuery { PartNumber = id });
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreatePurchaseItemCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<int>> Update([FromBody] UpdatePurchaseItemCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Delete")]
        public async Task<ActionResult<bool>> Delete([FromBody] DeletePurchaseItemCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
using Application.PurchaseParts.Commands;
using Application.PurchaseParts.Queries;
using Application.Warehouses.Commands;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class PurchasePartsController : ApiControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<List<PurchasePartsDto>>> GetItems([FromQuery] GetPurchasePartsQuery query)
        {
            return await Mediator.Send(query);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<PurchasePart>> Get(string id)
        {
            return await Mediator.Send(new GetPurchasePartQuery { PartNumber = id });
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreatePurchasePartCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<int>> Update([FromBody] UpdatePurchasePartCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Delete")]
        public async Task<ActionResult<bool>> Delete([FromBody] DeletePurchasePartCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

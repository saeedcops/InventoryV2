using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
using Application.Orders.Queries;
using Application.Parts.Commands;
using Application.Parts.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class PartsController: ApiControllerBase
    {

        [HttpGet("{id}")]
        public async Task<ActionResult<Part>> Get(int id)
        {
            return await Mediator.Send(new GetPartQuery { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<Part>>> GetParts([FromQuery] GetPartsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("Sold")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> GetSold([FromQuery] GetSoldPartsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("Exceeded")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> Exceeded([FromQuery] GetExceededPartsPartNumberQuery query)
        {
            return await Mediator.Send(query);
        }
        [HttpGet("Borrowed")]
        public async Task<ActionResult<int>> GetBorrowed([FromQuery] GetBorrowedPartsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("PartNumbers")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> GetPartPartNumber([FromQuery] GetPartsPartNumberQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreatePartCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<int>> Update([FromBody] UpdatePartCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

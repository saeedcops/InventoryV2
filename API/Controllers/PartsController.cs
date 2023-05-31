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
        public async Task<ActionResult<PaginatedList<PartDto>>> GetPartsWithPagination([FromQuery] GetPartsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<Part>> Create([FromForm] CreatePartCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Part>> Update([FromForm] UpdatePartCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

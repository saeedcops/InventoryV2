using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
using Application.Parts.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ItemsController: ApiControllerBase
    {

        [HttpGet("Dashboard")]
        public async Task<ActionResult<ItemDashboardDto>> GetItemDashboard([FromQuery] GetItemDashboardQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet]
        public async Task<ActionResult<List<ItemDto>>> GetItems([FromQuery] GetItemsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("PartNumbers")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> GetPartPartNumber([FromQuery] GetItemsPartNumberQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("Sold")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> GetSold([FromQuery] GetSoldItemsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("Exceeded")]
        public async Task<ActionResult<List<PartNumberQtyDto>>> Exceeded([FromQuery] GetExceededItemsPartNumberQuery query)
        {
            return await Mediator.Send(query);
        }
        [HttpGet("Borrowed")]
        public async Task<ActionResult<int>> GetBorrowed([FromQuery] GetBorrowedItemsQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> Get(int id)
        {
            return await Mediator.Send(new GetItemQuery { Id = id });
        }


        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateItemCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Item>> Update([FromBody] UpdateItemsCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

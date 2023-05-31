using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
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

        //[HttpGet]
        //public async Task<ActionResult<PaginatedList<ItemDto>>> GetItemsWithPagination([FromQuery] GetItemsWithPaginationQuery query)
        //{
        //    return await Mediator.Send(query);
        //}


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

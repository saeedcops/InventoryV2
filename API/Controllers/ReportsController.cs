using Application.Common.Models;
using Application.Common.Security;
using Application.Items.Commands;
using Application.Items.Queries;
using Application.Parts.Queries;
using Application.Reports.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ReportsController : ApiControllerBase
    {

 

        [HttpGet("ItemAction")]
        public async Task<ActionResult<List<ItemDto>>> ItemAction([FromQuery] GetItemsActionsQuery query)
        {
            return await Mediator.Send(query);
        }


        [HttpGet("PartAction")]
        public async Task<ActionResult<List<PartDto>>> PartAction([FromQuery] GetPartsActionsQuery query)
        {
            return await Mediator.Send(query);
        }




    }
}

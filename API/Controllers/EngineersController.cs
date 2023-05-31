using Application.Brands.Commands;
using Application.Brands.Queries;
using Application.Engineers.Commands;
using Application.Engineers.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EngineersController: ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Engineer>>> Get()
        {
            return await Mediator.Send(new GetEngineersQuery());
        }


        [HttpPost]
        public async Task<ActionResult<Engineer>> Create([FromForm] CreateEngineerCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Engineer>> Update([FromForm] UpdateEngineersCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

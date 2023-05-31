using Application.Brands.Commands;
using Application.Brands.Queries;

using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   // [Authorize]
    public class BrandsController: ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Brand>>> Get()
        {
            return await Mediator.Send(new GetBrandsQuery ());
        }


        [HttpPost]
        public async Task<ActionResult<Brand>> Create([FromForm] CreateBrandCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Brand>> Update([FromForm] UpdateBrandCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

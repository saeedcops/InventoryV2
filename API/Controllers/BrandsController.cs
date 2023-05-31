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
        public async Task<ActionResult<Brand>> Create([FromBody] CreateBrandCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Brand>> Update([FromBody] UpdateBrandCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Delete")]
        public async Task<ActionResult<bool>> Delete([FromBody] DeleteBrandCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

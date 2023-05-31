
using Application.Customers.Commands;
using Application.Customers.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CustomersController: ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> Get()
        {
            return await Mediator.Send(new GetCustomersQuery());
        }


        [HttpPost]
        public async Task<ActionResult<Customer>> Create([FromForm] CreateCustomerCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Customer>> Update([FromForm] UpdateCustomersCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}


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
        public async Task<ActionResult<Customer>> Create([FromBody] CreateCustomerCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Update")]
        public async Task<ActionResult<Customer>> Update([FromBody] UpdateCustomersCommand command)
        {

            return await Mediator.Send(command);
        }


        [HttpPost("Delete")]
        public async Task<ActionResult<bool>> Delete([FromBody] DeleteCustomerCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

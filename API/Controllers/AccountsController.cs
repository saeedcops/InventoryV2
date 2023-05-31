using Application.Accounts.Commands;
using Application.Accounts.Queries;
using Application.Brands.Commands;
using Application.Brands.Queries;
using Application.Common.Models;
using Application.Engineers.Commands;
using Application.Engineers.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountsController: ApiControllerBase
    {

        [HttpPost("Login")]
        public async Task<ActionResult<TokenResponse>> Login(LoginUserQuery login)
        {
            return await Mediator.Send(login);
        }


        [HttpGet("Roles")]
        public async Task<ActionResult<List<string>>> GetRoles([FromQuery] GetRolesQuery command)
        {

            return await Mediator.Send(command);
        }

        [HttpGet("UsersRole")]
        public async Task<ActionResult<List<UserDto>>> GetUsersRole([FromQuery] GetUsersQuery command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<Result>> Register([FromBody] RegisterUserCommand command)
        {
          
            return await Mediator.Send(command);
        }

        [HttpPost("Authorize")]
        public async Task<ActionResult<bool>> Authorize([FromBody] GrantAccessCommand command)
        {

            return await Mediator.Send(command);
        }

        [HttpPost("Revoke")]
        public async Task<ActionResult<bool>> Revoke([FromBody] RevokeAccessCommand command)
        {

            return await Mediator.Send(command);
        }
    }
}

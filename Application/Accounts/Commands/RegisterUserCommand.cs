using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using MediatR;
using System.Data;

namespace Application.Accounts.Commands
{
   // [Authorize(Roles = "Admin")]
    public record RegisterUserCommand : IRequest<Result>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterUserCommand, Result>
    {
        private readonly IIdentityService _context;
        
        public RegisterCommandHandler(IIdentityService context)
        {
            _context = context;
            
        }

        public async Task<Result> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {

            var user = await _context.RegisterAsync(
                new TokenRequest
                {
                    Email = request.Username,
                    Password = request.Password,
                });

            return user;
        }
    }

}

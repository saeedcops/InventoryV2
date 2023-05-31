using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Accounts.Queries
{
public record LoginUserQuery : IRequest<TokenResponse>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, TokenResponse>
    {
        private readonly IIdentityService _context;

        public LoginUserQueryHandler(IIdentityService context)
        {
            _context = context;
        }

        public async Task<TokenResponse> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {

            var user = await _context.LoginAsync(new TokenRequest { Email = request.Email, Password = request.Password });

            return user;
        }
    }


}

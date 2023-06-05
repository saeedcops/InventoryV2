using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;

namespace Application.Accounts.Queries
{
    public record GetUserDataQuery : IRequest<TokenResponse>
    {

    }

    public class GetUserDataQueryHandler : IRequestHandler<GetUserDataQuery, TokenResponse>
    {
        private readonly ICurrentUserService _context;

        public GetUserDataQueryHandler(ICurrentUserService context)
        {
            _context = context;
        }

        public async Task<TokenResponse> Handle(GetUserDataQuery request, CancellationToken cancellationToken)
        {

            return new TokenResponse { User = _context.Email, Role = _context.Roles };

        }
    }


}

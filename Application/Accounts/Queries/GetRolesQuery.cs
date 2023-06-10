using Application.Common.Interfaces;
using Application.Common.Security;
using MediatR;

namespace Application.Accounts.Queries
{
    [Authorize(Roles = "Admin")]
    public record GetRolesQuery : IRequest<List<string>>
    {

    }

    public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, List<string>>
    {
        private readonly IIdentityService _context;

        public GetRolesQueryHandler(IIdentityService context)
        {
            _context = context;
        }

        public async Task<List<string>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {

            return new List<string>() { "Admin","User", "Supervaisuor" };

        }
    }


}

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

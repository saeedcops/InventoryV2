using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using MediatR;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Accounts.Queries
{
    [Authorize(Roles = "Admin")]
    public record GetUsersQuery : IRequest<List<UserDto>>
    {

    }

    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, List<UserDto>>
    {
        private readonly IIdentityService _context;

        public GetUsersQueryHandler(IIdentityService context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {

            return await _context.GetUsersRoleAsync();

        }
    }


}

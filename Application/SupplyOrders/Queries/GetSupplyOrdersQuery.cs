using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.SupplyOrders.Queries
{
  public record GetSupplyOrdersQuery : IRequest<List<SupplyOrder>>
    {
    }

    public class GetSupplyOrdersQueryHandler : IRequestHandler<GetSupplyOrdersQuery, List<SupplyOrder>>
    {
        private readonly IApplicationDbContext _context;
        //  private readonly IMapper _mapper;

        public GetSupplyOrdersQueryHandler(IApplicationDbContext context)
        {
            _context = context;
            // _mapper = mapper;
        }

        public async Task<List<SupplyOrder>> Handle(GetSupplyOrdersQuery request, CancellationToken cancellationToken)
        {
            return await _context.SupplyOrders
                .Include(o => o.SupplyOrderItems)
                .Include(o=>o.SupplyOrderParts).ToListAsync();
        }
    }
}

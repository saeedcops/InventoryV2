using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Warehouses.Queries
{
 public record GetWarehouseQuery : IRequest<List<Warehouse>>
    {
    }

    public class GetWarehouseQueryHandler : IRequestHandler<GetWarehouseQuery, List<Warehouse>>
    {
        private readonly IApplicationDbContext _context;
        //  private readonly IMapper _mapper;

        public GetWarehouseQueryHandler(IApplicationDbContext context)
        {
            _context = context;
            // _mapper = mapper;
        }

        public async Task<List<Warehouse>> Handle(GetWarehouseQuery request, CancellationToken cancellationToken)
        {
            return await _context.Warehouses.ToListAsync();
        }
    }
}

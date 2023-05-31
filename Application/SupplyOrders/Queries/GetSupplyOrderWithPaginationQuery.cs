using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Queries
{
    public record GetSupplyOrderWithPaginationQuery : IRequest<PaginatedList<SupplyOrderDto>>
    {
        public int PageNumber { get; init; } = 1;
        public int PageSize { get; init; } = 10;
    }

    public class GetSupplyOrderWithPaginationQueryHandler : IRequestHandler<GetSupplyOrderWithPaginationQuery, PaginatedList<SupplyOrderDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetSupplyOrderWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<SupplyOrderDto>> Handle(GetSupplyOrderWithPaginationQuery request, CancellationToken cancellationToken)
        {
            return await _context.SupplyOrders
                .ProjectTo<SupplyOrderDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}

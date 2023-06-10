using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Orders.Queries
{
    [Authorize(Roles = "Supervaisuor")]
    public record GetOrdersQueries : IRequest<List<OrderDto>>
    {
    }

    public class GetOrdersQueriesHandler : IRequestHandler<GetOrdersQueries, List<OrderDto>>
    {
        private readonly IApplicationDbContext _context;
          private readonly IMapper _mapper;

        public GetOrdersQueriesHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<OrderDto>> Handle(GetOrdersQueries request, CancellationToken cancellationToken)
        {
            return await _context.Orders
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}

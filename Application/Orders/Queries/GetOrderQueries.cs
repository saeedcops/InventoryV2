using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Application.Orders.Queries
{
    [Authorize(Roles = "Supervaisuor")]
    public record GetOrderQueries : IRequest<Order>
    {
        public int Id { get; set; }
    }

    public class GetOrderQueriesHandler : IRequestHandler<GetOrderQueries, Order>
    {
        private readonly IApplicationDbContext _context;

        public GetOrderQueriesHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> Handle(GetOrderQueries request, CancellationToken cancellationToken)
        {
            return await _context.Orders
                .Include(o => o.Engineer)
                .Include(o => o.Customer)
                .Include(o => o.OrderParts)
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == request.Id);
        }
    }
}

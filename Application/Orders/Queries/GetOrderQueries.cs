using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Application.Orders.Queries
{
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

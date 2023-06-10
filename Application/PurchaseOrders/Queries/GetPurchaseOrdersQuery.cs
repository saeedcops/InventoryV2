using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseOrders.Queries
{
    [Authorize(Roles = "User")]
    public record GetPurchaseOrdersQuery : IRequest<List<PurchaseOrder>>
    {
    }

    public class GetPurchaseOrdersQueryHandler : IRequestHandler<GetPurchaseOrdersQuery, List<PurchaseOrder>>
    {
        private readonly IApplicationDbContext _context;
        //  private readonly IMapper _mapper;

        public GetPurchaseOrdersQueryHandler(IApplicationDbContext context)
        {
           _context = context;
            // _mapper = mapper;
        }

        public async Task<List<PurchaseOrder>> Handle(GetPurchaseOrdersQuery request, CancellationToken cancellationToken)
        {
            return await _context.PurchaseOrders.ToListAsync();
        }
    }
}

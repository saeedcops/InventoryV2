using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseItems.Queries
{
    // [Authorize(Roles ="AddItem")]
    [Authorize(Roles = "User")]
    public record GetPurchaseItemQuery : IRequest<PurchaseItem>
    {
        public string PartNumber { get; set; }
    }

    public class GetPurchaseItemQueryHandler : IRequestHandler<GetPurchaseItemQuery, PurchaseItem>
    {
        private readonly IApplicationDbContext _context;


        public GetPurchaseItemQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PurchaseItem> Handle(GetPurchaseItemQuery request, CancellationToken cancellationToken)
        {

            var entity = await _context.PurchaseItems
                .Include(i => i.Brand)
                //.Include(i => i.Parts)
                .FirstOrDefaultAsync(p => p.PartNumber.Equals(request.PartNumber));

            if (entity == null)
            {
                throw new NotFoundException($"PurchaseItems with PartNumber{request.PartNumber} Not Found");
            }
            return entity;
        }
    }
}

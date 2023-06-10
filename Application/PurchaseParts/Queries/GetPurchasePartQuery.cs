using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.PurchaseParts.Queries
{
    // [Authorize(Roles ="AddItem")]
    [Authorize(Roles = "User")]
    public record GetPurchasePartQuery : IRequest<PurchasePart>
    {
        public string PartNumber { get; set; }
    }

    public class GetPurchasePartQueryHandler : IRequestHandler<GetPurchasePartQuery, PurchasePart>
    {
        private readonly IApplicationDbContext _context;


        public GetPurchasePartQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PurchasePart> Handle(GetPurchasePartQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.PurchaseParts
                
                .FirstOrDefaultAsync(p => p.PartNumber.Equals(request.PartNumber));
            if (entity == null)
            {
                throw new NotFoundException($"PurchaseParts with PartNumber{request.PartNumber} Not Found");
            }
            return entity;
        }
    }
}

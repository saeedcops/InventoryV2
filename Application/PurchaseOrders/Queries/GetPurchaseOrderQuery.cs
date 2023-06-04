using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Mapping;
using Application.Common.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.PurchaseOrders.Queries
{
    public record GetPurchaseOrderQuery : IRequest<PurchaseOrder>
    {
        public int Id { get; set; }
    }

    public class GetPurchaseOrderQueryHandler : IRequestHandler<GetPurchaseOrderQuery, PurchaseOrder>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPurchaseOrderQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PurchaseOrder> Handle(GetPurchaseOrderQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.PurchaseOrders

                 .Include(i => i.Items).ThenInclude(i => i.Item)
                 .Include(i => i.Parts).ThenInclude(i => i.Part)

                 .FirstOrDefaultAsync(p => p.Id == request.Id);

            if (entity == null)
            {
                throw new NotFoundException($"PurchaseOrders with ID {request.Id} Not Found");
            }
            return entity;
        }
    }
}

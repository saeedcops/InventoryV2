using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;

namespace Application.PurchaseItems.Commands
{
    [Authorize(Roles = "User")]
    public record UpdatePurchaseItemCommand : IRequest<int>
    {
        public string PartNumber { get; set; }
        public string OracleCode { get; set; }
        public string Model { get; set; }
        public int ExceedLimit { get; set; }

        public string Description { get; set; }
        public int BrandId { get; set; }
        public byte[]? Image { get; set; }
        public List<OrderItem>? Parts { get; set; }
    }

    public class UpdatePurchaseItemCommandHandler : IRequestHandler<UpdatePurchaseItemCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePurchaseItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdatePurchaseItemCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.PurchaseItems.FirstOrDefaultAsync(b => b.PartNumber.Equals(request.PartNumber));
            if (entity == null)
                throw new NotFoundException($"No PurchaseItems with {request.PartNumber}");

            entity.OracleCode = request.OracleCode != null ? request.OracleCode : entity.OracleCode;
            entity.Model = request.Model != null ? request.Model : entity.Model;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            entity.BrandId = request.BrandId != 0 ? request.BrandId : entity.BrandId;
            entity.Image = request.Image != null ? request.Image : entity.Image;
            entity.ExceededLimit = request.ExceedLimit != 0 ? request.ExceedLimit : entity.ExceededLimit;
           
            if (request.Parts != null)
            {
                var parts = new List<PurchasePart>();
                foreach (var serial in request.Parts)
                    parts.Add(await _context.PurchaseParts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial.PartNumber)));

                entity.Parts = parts;
            }
            _context.PurchaseItems.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

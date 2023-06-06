using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Application.PurchaseItems.Commands
{
  public record CreatePurchaseItemCommand : IRequest<int>
    {
        [Required]
        public string PartNumber { get; set; }
        [Required]
        public string OracleCode { get; set; }
        [Required]
        public string Model { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public int ExceedLimit { get; set; }
        public byte[]? Image { get; set; }
        public List<OrderItem> Parts { get; set; }
    }

    public class CreatePurchaseItemCommandHandler : IRequestHandler<CreatePurchaseItemCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreatePurchaseItemCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreatePurchaseItemCommand request, CancellationToken cancellationToken)
        {
            var entity = new PurchaseItem
            {
                PartNumber = request.PartNumber,
                OracleCode = request.OracleCode,
                Model = request.Model,
                Description = request.Description,  
                BrandId = request.BrandId,
                Image = request.Image,
                ExceededLimit = request.ExceedLimit,
 
            };
            var parts = new List<PurchasePart>();
            if (request.Parts != null)
                foreach (var serial in request.Parts)
                 parts.Add(await _context.PurchaseParts.FirstOrDefaultAsync(x => x.PartNumber.Equals(serial.PartNumber)));
       
            entity.Parts = parts;
            entity = _context.PurchaseItems.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enum;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Application.PurchaseParts.Commands
{
  public record CreatePurchasePartCommand : IRequest<int>
    {
        [Required]
        public string PartNumber { get; set; }
        [Required]
        public string OracleCode { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[]? Image { get; set; }
    }

    public class CreatePurchasePartCommandHandler : IRequestHandler<CreatePurchasePartCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreatePurchasePartCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreatePurchasePartCommand request, CancellationToken cancellationToken)
        {
            var entity = new PurchasePart
            {
                PartNumber = request.PartNumber,
                OracleCode = request.OracleCode,
                Description = request.Description,  
                Image = request.Image,
                Name = request.Name
 
            };

            entity = _context.PurchaseParts.Add(entity).Entity;

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

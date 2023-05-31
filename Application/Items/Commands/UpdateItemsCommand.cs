using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Items.Commands
{
   public record UpdateItemsCommand : IRequest<Item>
    {
        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? SerialNumber { get; set; }
        public string? OracleCode { get; set; }
        public string? Model { get; set; }
        public string? Description { get; set; }
        public int ItemTypeId { get; set; }
        public int BrandId { get; set; }
        public int WarehouseId { get; set; }
        public int CustomerId { get; set; }
        public int EnginnerId { get; set; }
        public byte[]? Image { get; set; }

    }

    public class UpdateItemsCommandHandler : IRequestHandler<UpdateItemsCommand, Item>
    {
        private readonly IApplicationDbContext _context;

        public UpdateItemsCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Item> Handle(UpdateItemsCommand request, CancellationToken cancellationToken)
        {

           var entity=await _context.Items.FirstOrDefaultAsync(b=> b.Id == request.Id);
            if (entity == null)
                throw new NotFoundException($"No Items with {request.Id}");

            entity.PartNumber = request.PartNumber != null ? request.PartNumber : entity.PartNumber;
            entity.SerialNumber = request.SerialNumber != null ? request.SerialNumber : entity.SerialNumber;
            entity.OracleCode = request.OracleCode != null ? request.OracleCode : entity.OracleCode;
            entity.Model = request.Model != null ? request.Model : entity.Model;
            entity.Description = request.Description != null ? request.Description : entity.Description;
            entity.ItemTypeId = request.ItemTypeId != 0 ? request.ItemTypeId : entity.ItemTypeId;
            entity.BrandId = request.BrandId != 0 ? request.BrandId : entity.BrandId;
            entity.WarehouseId = request.WarehouseId != 0 ? request.WarehouseId : entity.WarehouseId;
            entity.CustomerId = request.CustomerId != 0 ? request.CustomerId : entity.CustomerId;
            entity.EngneerId = request.EnginnerId != 0 ? request.EnginnerId : entity.EngneerId;
            entity.Image = request.Image != null ? request.Image : entity.Image;


            _context.Items.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity;
        }
    }

}

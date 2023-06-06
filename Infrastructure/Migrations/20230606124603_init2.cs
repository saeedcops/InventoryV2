using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExceededLimit",
                table: "PurchaseParts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExceededLimit",
                table: "PurchaseItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExceededLimit",
                table: "Parts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExceededLimit",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExceededLimit",
                table: "PurchaseParts");

            migrationBuilder.DropColumn(
                name: "ExceededLimit",
                table: "PurchaseItems");

            migrationBuilder.DropColumn(
                name: "ExceededLimit",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "ExceededLimit",
                table: "Items");
        }
    }
}

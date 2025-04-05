using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class VirtualUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_ColorOption_ColorId",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ColorOption",
                table: "ColorOption");

            migrationBuilder.RenameTable(
                name: "ColorOption",
                newName: "ColorOptions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ColorOptions",
                table: "ColorOptions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_ColorOptions_ColorId",
                table: "Tags",
                column: "ColorId",
                principalTable: "ColorOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_ColorOptions_ColorId",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ColorOptions",
                table: "ColorOptions");

            migrationBuilder.RenameTable(
                name: "ColorOptions",
                newName: "ColorOption");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ColorOption",
                table: "ColorOption",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_ColorOption_ColorId",
                table: "Tags",
                column: "ColorId",
                principalTable: "ColorOption",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

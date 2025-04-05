using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Transactions_TransactionId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_TransactionId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Tags");

            migrationBuilder.CreateTable(
                name: "TagTransaction",
                columns: table => new
                {
                    TagsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagTransaction", x => new { x.TagsId, x.TransactionsId });
                    table.ForeignKey(
                        name: "FK_TagTransaction_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagTransaction_Transactions_TransactionsId",
                        column: x => x.TransactionsId,
                        principalTable: "Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagTransaction_TransactionsId",
                table: "TagTransaction",
                column: "TransactionsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagTransaction");

            migrationBuilder.AddColumn<Guid>(
                name: "TransactionId",
                table: "Tags",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TransactionId",
                table: "Tags",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Transactions_TransactionId",
                table: "Tags",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id");
        }
    }
}

﻿using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Entity;

namespace TaskManagerAPI.Data
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne(u => u.User)
                .HasForeignKey<Address>(u => u.UserId);

            modelBuilder.Entity<User>()
                .HasMany(t => t.Tasks)
                .WithOne(u => u.User)
                .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<TaskItem>()
                .HasMany(c => c.CheckLists)
                .WithOne(t => t.Task)
                .HasForeignKey(t => t.TaskId);

            base.OnModelCreating(modelBuilder);
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace App.API.Models
{
    public class NoteModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime Updated { get; set; }
        public string Background { get; set; }
        public string UserName { get; set; }
    }
}
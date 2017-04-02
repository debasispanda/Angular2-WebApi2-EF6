using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using App.API.Models;

namespace App.API.Controllers
{
    [Authorize]
    public class NotesController : ApiController
    {
        private AppAPIContext db = new AppAPIContext();

        // GET: api/Notes
        //public IQueryable<NoteModel> GetNoteModels()
        //{
        //    return db.Notes;
        //}

        public List<NoteDTO> GetNoteModels()
        {
            IQueryable<NoteModel> notes = db.Notes;
            //Mapper.Initialize(cfg => cfg.CreateMap<NoteModel, NoteDTO>());
            var newNotes = new List<NoteDTO>();
            foreach (var note in notes)
            {
                newNotes.Add(new NoteDTO()
                {
                    Id = note.Id,
                    Title = note.Title,
                    Description = note.Description,
                    Type = note.Type,
                    Background = note.Background,
                    Updated = note.Updated
                });
            }
            return newNotes;
        }

        // GET: api/Notes/5
        [ResponseType(typeof(NoteDTO))]
        public async Task<IHttpActionResult> GetNoteModel(int id)
        {
            NoteModel noteModel = await db.Notes.FindAsync(id);
            if (noteModel == null)
            {
                return NotFound();
            }
            NoteDTO note = new NoteDTO()
            {
                Id = noteModel.Id,
                Title = noteModel.Title,
                Description = noteModel.Description,
                Type = noteModel.Type,
                Background = noteModel.Background,
                Updated = noteModel.Updated
            };

            return Ok(note);
        }

        // PUT: api/Notes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNoteModel(int id, NoteDTO noteModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != noteModel.Id)
            {
                return BadRequest();
            }
            NoteModel updatedNote = new NoteModel()
            {
                Id = noteModel.Id,
                Title = noteModel.Title,
                Description = noteModel.Description,
                Type = noteModel.Type,
                Updated = DateTime.Now,
                Background = noteModel.Background,
                UserName = User.Identity.Name
            };
            db.Entry(updatedNote).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Updated Successfully");
        }

        // POST: api/Notes
        [ResponseType(typeof(NoteModel))]
        public async Task<IHttpActionResult> PostNoteModel(NoteModel noteModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            noteModel.Updated = DateTime.Now;
            noteModel.UserName = User.Identity.Name;
            db.Notes.Add(noteModel);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = noteModel.Id }, noteModel);
        }

        // DELETE: api/Notes/5
        [ResponseType(typeof(NoteModel))]
        public async Task<IHttpActionResult> DeleteNoteModel(int id)
        {
            NoteModel noteModel = await db.Notes.FindAsync(id);
            if (noteModel == null)
            {
                return NotFound();
            }

            db.Notes.Remove(noteModel);
            await db.SaveChangesAsync();

            return Ok(noteModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NoteModelExists(int id)
        {
            return db.Notes.Count(e => e.Id == id) > 0;
        }
    }
}
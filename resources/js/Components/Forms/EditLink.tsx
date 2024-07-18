import { PenIcon, RocketIcon, Terminal } from "lucide-react"
import InputLabel from "../InputLabel"
import TextInput from "../TextInput"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { LinkType } from "@/types/links"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"
import { Alert, AlertTitle } from "../ui/alert"
import InputError from "../InputError"

export function EditLink({link} : {link : LinkType}) {
    const { data, processing, errors, setData, post, wasSuccessful} = useForm({
        name : link.name,
        original_url : link.original_url
    })

    const update:FormEventHandler = (e) => {
        e.preventDefault();

        post(route('link.edit', [link.slug]))
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">Edit <PenIcon className="h-4"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {
            wasSuccessful && (
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>URL updated successfully! </AlertTitle>
                </Alert>
            )
        }

        <form onSubmit={update} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <InputLabel htmlFor="name" className="text-right">
              Title
            </InputLabel>
            <TextInput id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
            <InputError className="col-span-4" message={errors.name}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <InputLabel htmlFor="original_url" className="text-right">
              Original URL
            </InputLabel>
            <TextInput id="original_url" type="url" name="original_url" onChange={(e) => setData('original_url', e.target.value)} value={data.original_url} className="col-span-3" />
            <InputError className="col-span-4" message={errors.original_url}/>
          </div>
        <DialogFooter>
            <DialogClose><Button type="button" variant={"outline"}>Close</Button></DialogClose>
            <Button disabled={processing} type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

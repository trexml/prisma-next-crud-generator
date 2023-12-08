import { DMMF } from '@prisma/generator-helper'
import { mapFieldsToFormInputs } from '../helpers/mapFieldsToFormInputs'
import { pluralize } from '../utils/strings'

export const create = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase()
  const modelNameLowerPlural = pluralize(modelNameLower)
  const fieldsInput = mapFieldsToFormInputs(fields)

  return `
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { create${modelName} } from '@/actions/${modelNameLower}';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  
  export default function ${modelName}CreatePage() {
    return (
      <>
        <header className="mb-4">
          <Heading>Create ${modelName}</Heading>
        </header>
        <form action={create${modelName}} className="px-2 max-w-xl">
          ${fieldsInput}

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/${modelNameLowerPlural}"
              className="underline text-gray-500"
            >
              Return to ${modelNameLowerPlural} list
            </Link>
  
            <Button
              type="submit"
            >
              Create
            </Button>
          </footer>
        </form>
      </>
    )
  }
  `
}

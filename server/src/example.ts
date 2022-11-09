import { model, Schema } from 'mongoose';

interface App {
  isLoading: boolean;
}

const AppSchema = new Schema<App>(
  {
    isLoading: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const AppCollection = model('app', AppSchema);

interface Collections {
  app: typeof AppCollection;
}

interface Context {
  collections: Collections;
}

function updateIsLoading({ _id }: Record<string, string>, context: Context) {
  const { collections } = context;

  collections.app.updateOne({ _id }, { isLoading: true });
}

function buildProductionContext(): Context {
  return { collections: { app: AppCollection } };
}

function buildTestingContext(): Context {
  // @ts-ignore - demo only
  return { collections: { app: mockCollection } };
}

updateIsLoading({ _id: 'xxxx' }, buildProductionContext());
updateIsLoading({ _id: 'xxxx' }, buildTestingContext());

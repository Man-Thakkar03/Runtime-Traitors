from typing import Type, TypeVar, Generic, List, Optional, Any, Dict
from beanie import Document
from pydantic import BaseModel

ModelType = TypeVar("ModelType", bound=Document)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, id: Any) -> Optional[ModelType]:
        return await self.model.get(id)

    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        return await self.model.find_all().skip(skip).limit(limit).to_list()

    async def create(self, obj_in: CreateSchemaType) -> ModelType:
        obj = self.model(**obj_in.dict())
        await obj.insert()
        return obj

    async def update(self, db_obj: ModelType, obj_in: UpdateSchemaType) -> ModelType:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        await db_obj.save()
        return db_obj

    async def remove(self, id: Any) -> Optional[ModelType]:
        obj = await self.model.get(id)
        if obj:
            await obj.delete()
        return obj 
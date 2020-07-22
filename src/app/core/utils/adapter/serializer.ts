import {
    serialize,
    deserialize,
    ClazzOrModelSchema,
    getDefaultModelSchema,
    Clazz,
    object,
    list,
    alias
} from 'serializr';
import { isNullOrUndefined } from 'util';

export class Serializer {
    public static serialize(value: Record<string, string>): string {
        return JSON.stringify(serialize(value));
    }

    public static deserialize<T>(modelSchema: ClazzOrModelSchema<T>, json: any): T {
        return deserialize(modelSchema, json);
    }

    public static setPropAsObject<T>(
        clazz: Clazz<T>,
        prop: string,
        modelschema: ClazzOrModelSchema<any>,
        serializedName?: string
    ) {
        getDefaultModelSchema(clazz).props[prop] = serializedName
            ? alias(serializedName, object(modelschema))
            : object(modelschema);
    }

    public static setPropAsObjectList<T>(
        clazz: Clazz<T>,
        prop: string,
        modelschema: ClazzOrModelSchema<any>,
        serializedName?: string
    ) {
        getDefaultModelSchema(clazz).props[prop] = serializedName
            ? alias(serializedName, list(object(modelschema)))
            : list(object(modelschema));
    }

    public static serializeDate(value: any): string {
        if (!isNullOrUndefined(value)) {
            const date = new Date(value).toISOString();

            return date.replace(/\.(\d){3}Z$/, 'Z');
        }
    }

    public static serializeDateWithoutTime(value: any): string {
        if (!isNullOrUndefined(value)) {
            return new Date(value).toLocaleDateString();
        }
    }

    public static deserializeDate(value: any): Date {
        if (!isNullOrUndefined(value)) {
            return new Date(value);
        }
    }
}

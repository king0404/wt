import xmlschema
#pip install xmlschema
schema = xmlschema.XMLSchema('orderSchema.xsd')

if schema.is_valid('order.xml'):
    print("✅ XML is valid according to the schema!")
else:
    print("❌ XML is invalid! Details below:")
    for error in schema.iter_errors('order.xml'):
        print(error)

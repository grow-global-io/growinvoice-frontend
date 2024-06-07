import * as React from 'react';
import { Box, Drawer, Button, Typography, Grid } from '@mui/material';
import { Constants } from '@shared/constants';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { TextFormField } from '@shared/components/FormFields/TextFormField';
import { AutocompleteField } from '@shared/components/FormFields/AutoComplete';
const style = {
  bgcolor: "rgba(246, 250, 255, 1)",
  padding:"15px",
  borderRadius:1
};

export default function CreateProduct() {
  const [state, setState] = React.useState({
    right: false,
    showUnitBox: false,
    showHsnBox: false,
    showTaxBox: false,
  });

  const initialValues = {
    serviceName:"",
    unit:"",
    unitName:"",
    hsnCode:"",
    hsnCodeName:"",
    hsnCodeTaxes:"",
    taxes:"",
    taxesPercentage:"",
    taxesDescription:"",
    description:""
    
   
  };

  const schema = yup.object().shape({});
  const handleSubmit = () => { };

  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const toggleDrawer = (open: boolean) => {
    setState(prevState => ({ ...prevState, right: open }));
  };

  const toggleBox = (box: string, value: boolean) => {
    setState(prevState => ({ ...prevState, [box]: value }));
  };

  const list = () => (
    <Box
      sx={{ width: { sm: "400px" } }}
      role="presentation"
      padding={2}
    >
      <Grid container justifyContent={"space-between"}>
        <Typography
          variant="h4"
          color={"secondary.dark"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img src={Constants.customImages.ProductSymbol} alt="Invoice Icon" /> New Product
        </Typography>
        <img src={Constants.customImages.CloseIcon} alt='closeIcon' onClick={() => toggleDrawer(false)} width={"30px"} height={"30px"} />
      </Grid>

      <Box sx={{ mb: 2, mt: 2 }}>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    name="serviceName"
                    component={TextFormField}
                    label="Service Name"
                    required={true}
                    placeholder={"Enter Service Name"}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Field
                    name="unit"
                    label="Unit"
                    component={AutocompleteField}
                    options={options}
                    required={true}
                    placeholder={"Select"}
                  />
                  {!state.showUnitBox && (
                    <Typography
                      variant='h4'
                      color={"secondary.main"}
                      onClick={() => toggleBox('showUnitBox', true)}
                      sx={{ cursor: 'pointer' }}
                    >
                      +Add Unit
                    </Typography>
                  )}
                  {state.showUnitBox && (
                    <Box sx={style}>
                      <Field
                        name="unitName"
                        component={TextFormField}
                        label="Name"
                        required={true}
                        placeholder={"Enter Name"}
                      />
                      <Box textAlign={'center'} marginTop={2}>
                        <Button variant="contained" type="submit">Create Product Unit</Button>
                        <Button variant="contained" onClick={() => toggleBox('showUnitBox', false)} sx={{ bgcolor: "secondary.dark", marginLeft: 2 }}>Cancel</Button>
                      </Box>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Field
                    name="hsnCode"
                    label="HSN Code(India)"
                    component={AutocompleteField}
                    options={options}
                    required={true}
                    placeholder={"Select"}
                  />
                  {!state.showHsnBox && (
                    <Typography
                      variant='h4'
                      color={"secondary.main"}
                      onClick={() => toggleBox('showHsnBox', true)}
                      sx={{ cursor: 'pointer' }}
                    >
                      &#43;Add HSN
                    </Typography>
                  )}
                  {state.showHsnBox && (
                    <Box sx={style}>
                      <Field
                        name="hsnCodeName"
                        component={TextFormField}
                        label="Name"
                        required={true}
                        placeholder={"Enter Name"}
                      />
                      <Field
                        name="hsnCodeTaxes"
                        label="Choose Taxes"
                        component={AutocompleteField}
                        options={options}
                        required={true}
                        placeholder={"Select"}

                      />
                      <Box textAlign={'center'} marginTop={2}>
                        <Button variant="contained" type="submit">Create Hsn Code</Button>
                        <Button variant="contained" onClick={() => toggleBox('showHsnBox', false)} sx={{ bgcolor: "secondary.dark", marginLeft: 2 }}>Cancel</Button>
                      </Box>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Field
                    name="taxes"
                    label="Taxes"
                    component={AutocompleteField}
                    options={options}
                    required={true}
                    placeholder={"Select"}
                  />
                  {!state.showTaxBox && (
                    <Typography
                      variant='h4'
                      color={"secondary.main"}
                      onClick={() => toggleBox('showTaxBox', true)}
                      sx={{ cursor: 'pointer' }}
                    >
                      &#43;Add Taxes
                    </Typography>
                  )}
                  {state.showTaxBox && (
                    <Box sx={style}>
                      <Field
                        name="taxesPercentage"
                        component={TextFormField}
                        label="Percentage"
                        required={true}
                        placeholder={"Enter Percentage"}
                        type="number"
                      />
                      <Field
                        name="taxesDescription"
                        component={TextFormField}
                        label="Description"
                        required={true}
                        placeholder={"Description"}
                        multiline
                        rows={5}
                      />
                      <Box textAlign={'center'} marginTop={2}>
                        <Button variant="contained" type="submit">Create Tax</Button>
                        <Button variant="contained" onClick={() => toggleBox('showTaxBox', false)} sx={{ bgcolor: "secondary.dark", marginLeft: 2 }}>Cancel</Button>
                      </Box>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Field
                    name="description"
                    component={TextFormField}
                    label="Description"
                    required={true}
                    placeholder={"Write description"}
                    multiline
                    rows={5}
                  />
                </Grid>

                <Grid item xs={12} textAlign={"center"}>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );

  return (
    <div>
      <Button onClick={() => toggleDrawer(true)}>Open Right Drawer</Button>
       <Drawer
        anchor="right"
        open={state.right}
        onClose={() => toggleDrawer(false)}
       >
        {list()}
      </Drawer>
    </div>
  );
}

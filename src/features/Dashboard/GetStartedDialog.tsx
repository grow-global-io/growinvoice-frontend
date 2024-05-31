import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import GreetImg from './../../assets/img/greet-img.png'
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: { xs: '80%', sm: '80%', md: 600 },
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: { xs: 2, sm: 3, md: 4 }, 
//   pb: 3,
// };
const GetStartedDialog = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {

  return (
    <>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Box textAlign={"center"} pb={2}>
            <img src={GreetImg} width={"230px"} />
            <Typography variant="h3" textAlign={"center"} color={"secondary.dark"} fontWeight={600} >Almost There! Just a Few Details</Typography>
            <Typography variant="h5" textAlign={"center"} px={"15%"} mt={1} color={"secondary.dark"} fontWeight={500}>Just enter a few details like currency and company information to start creating your invoices in no time!</Typography>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 3 }}>Get Started</Button>
          </Box>
        </Box>
      </Modal> */}


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogContent>
          <Box textAlign={"center"} pb={2}>
            <img src={GreetImg} width={"230px"} />
            <Typography variant="h3" textAlign={"center"} color={"secondary.dark"} fontWeight={600} >Almost There! Just a Few Details</Typography>
            <Typography variant="h5" textAlign={"center"} px={"15%"} mt={1} color={"secondary.dark"} fontWeight={500}>Just enter a few details like currency and company information to start creating your invoices in no time!</Typography>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 3 }}>Get Started</Button>
          </Box>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default GetStartedDialog

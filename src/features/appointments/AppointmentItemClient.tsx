import { Button, CircularProgress, Typography } from "@mui/material";
import { AccessAlarm, Person, Work } from "@mui/icons-material";
import { Appointment } from "../../types/Appointment";
import dayjs from "dayjs";
import { Status } from "../../types/Status";
import { AppointmentCard, InfoRow } from "../../utils/StylesHelper/Appointment";

type AppointmentItemClientProps = {
  appointment: Appointment;
  handleCancelAppointment: (id: number) => void;
  pending: boolean;
};

function AppointmentItemClient({
  appointment,
  handleCancelAppointment,
  pending,
}: AppointmentItemClientProps) {
  return (
    <AppointmentCard>
      <InfoRow>
        <Person fontSize="small" />
        <Typography>
          Staff: {appointment.staffMember.firstName} {appointment.staffMember.lastName}
        </Typography>
      </InfoRow>

      <InfoRow>
        <Work fontSize="small" />
        <Typography>Service: {appointment.service.name}</Typography>
      </InfoRow>

      <InfoRow>
        <AccessAlarm fontSize="small" />
        <Typography>
          {dayjs(appointment.startTime).format("D MMMM YYYY")}{" "}
          {dayjs(appointment.startTime).format("HH:mm")} -{" "}
          {dayjs(appointment.endTime).format("HH:mm")}
        </Typography>
      </InfoRow>

      <Typography>Status: {appointment.status}</Typography>

      {appointment.status !== Status.Canceled && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCancelAppointment(appointment.id)}
        >
          {pending ? <CircularProgress size={24} color="inherit" /> : "Cancel"}
        </Button>
      )}
    </AppointmentCard>
  );
}

export default AppointmentItemClient;

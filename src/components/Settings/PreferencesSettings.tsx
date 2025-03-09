import { SettingsProps } from "@/types/types";
import {
  Button,
  Group,
  MultiSelect,
  Paper,
  RangeSlider,
  Select,
  Slider,
  Tabs,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const PreferencesSettings = ({
  currentUser,
  majorOptions,
  yearOptions,
  interestOptions,
}: SettingsProps) => {
  const preferencesForm = useForm({
    initialValues: {
      ageRange: currentUser.dpAgeRange,
      distance: currentUser.dpDistance,
      showMe: currentUser.dpShowMe,
      interests: currentUser.dpInterests,
      majors: currentUser.dpMajors,
    },
  });
  return (
    <Tabs.Panel value="preferences">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form
          onSubmit={preferencesForm.onSubmit((values) => console.log(values))}
        >
          <Title order={4} mb="md">
            Dating Preferences
          </Title>

          <Text fw={500} mb="xs">
            Age Range
          </Text>
          <RangeSlider
            min={18}
            max={50}
            minRange={1}
            step={1}
            marks={[
              { value: 18, label: "18" },
              { value: 25, label: "25" },
              { value: 35, label: "35" },
              { value: 50, label: "50" },
            ]}
            mb="xl"
            {...preferencesForm.getInputProps("ageRange")}
          />

          <Text fw={500} mb="xs">
            Maximum Distance (miles)
          </Text>
          <Slider
            min={1}
            max={100}
            step={1}
            marks={[
              { value: 5, label: "5" },
              { value: 25, label: "25" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
            ]}
            mb="xl"
            {...preferencesForm.getInputProps("distance")}
          />

          <Select
            label="Show Me"
            placeholder="Select who to show"
            data={[
              { value: "everyone", label: "Everyone" },
              { value: "women", label: "Women" },
              { value: "men", label: "Men" },
              { value: "nonbinary", label: "Non-binary" },
            ]}
            mb="md"
            {...preferencesForm.getInputProps("showMe")}
          />

          <MultiSelect
            label="Interested in Majors"
            placeholder="Select majors you're interested in"
            data={majorOptions}
            mb="md"
            {...preferencesForm.getInputProps("majors")}
          />

          <MultiSelect
            label="Interested in Hobbies"
            placeholder="Select hobbies you're interested in"
            data={interestOptions}
            mb="md"
            {...preferencesForm.getInputProps("interests")}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="default">Reset to Default</Button>
            <Button type="submit">Save Preferences</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default PreferencesSettings;
